-- Neurogenetics Curriculum — Supabase Schema
-- Run this in the Supabase Dashboard SQL Editor

-- Residents (username + password auth)
CREATE TABLE residents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'resident',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Per-module progress (one row per resident per module)
CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  current_slide INTEGER NOT NULL DEFAULT 0,
  sections_read INTEGER[] NOT NULL DEFAULT '{}',
  slides_completed BOOLEAN NOT NULL DEFAULT FALSE,
  quiz_completed BOOLEAN NOT NULL DEFAULT FALSE,
  quiz_score REAL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  last_section INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(resident_id, module_id)
);

-- Quiz attempts (full answer history for review)
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]',
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Flagged key-points for review
CREATE TABLE flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  module_title TEXT NOT NULL DEFAULT '',
  section_title TEXT NOT NULL DEFAULT '',
  key_point TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(resident_id, module_id, section_title, key_point)
);

-- Free-form per-module notes (one row per resident per module)
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  module_title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(resident_id, module_id)
);

-- Admin override of section content (one row per overridden section)
CREATE TABLE section_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id TEXT NOT NULL,
  section_index INTEGER NOT NULL CHECK (section_index >= 0),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  content_html TEXT,
  key_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_draft BOOLEAN NOT NULL DEFAULT TRUE,
  updated_by UUID REFERENCES residents(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(module_id, section_index)
);

-- Admin override of quiz questions (one row per overridden question, per scope)
CREATE TABLE quiz_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id TEXT NOT NULL,
  scope TEXT NOT NULL CHECK (scope IN ('inline','comprehensive')),
  question_index INTEGER NOT NULL CHECK (question_index >= 0),
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  answer INTEGER NOT NULL CHECK (answer >= 0),
  explanation TEXT NOT NULL,
  is_draft BOOLEAN NOT NULL DEFAULT TRUE,
  updated_by UUID REFERENCES residents(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(module_id, scope, question_index)
);

-- Indexes
CREATE INDEX idx_progress_resident ON progress(resident_id);
CREATE INDEX idx_progress_updated ON progress(updated_at DESC);
CREATE INDEX idx_quiz_attempts_resident ON quiz_attempts(resident_id);
CREATE INDEX idx_quiz_attempts_module ON quiz_attempts(resident_id, module_id);
CREATE INDEX idx_flags_resident ON flags(resident_id);
CREATE INDEX idx_notes_resident ON notes(resident_id);
CREATE INDEX idx_section_overrides_module ON section_overrides(module_id);
CREATE INDEX idx_quiz_overrides_module ON quiz_overrides(module_id, scope);

-- Disable RLS (we use service_role key in API routes, not client-side access)
ALTER TABLE residents ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_overrides ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS, so no policies needed for our API routes
