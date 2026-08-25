const LANGUAGES = [
  "cpp",
  "python",
  "javascript",
  "java",
  "c",
  "go",
  "typescript",
];

const LANGUAGE_LABELS = {
  cpp: "C++",
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  c: "C",
  go: "Go",
  typescript: "TypeScript",
};

export default function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
  onAnalyze,
  loading,
}) {
  return (
    <div className="code-editor">
      <div className="editor-topbar">
        <div className="editor-title">
          <div className="editor-window-controls">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <span className="editor-file-name">
            source.code
          </span>
        </div>

        <div className="language-selector">
          <label htmlFor="language">Language</label>

          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={loading}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {LANGUAGE_LABELS[lang]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="editor-body">
        <div className="editor-status">
          <span className="status-dot"></span>
          Ready for analysis
        </div>

        <textarea
          className="code-editor-textarea"
          placeholder={`// Paste your ${LANGUAGE_LABELS[language]} code here...\n\n// The AI will analyze:\n// • Bugs\n// • Code quality issues\n// • Suggestions\n// • Time complexity\n// • Space complexity`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          disabled={loading}
        />
      </div>

      <div className="editor-footer">
        <div className="code-info">
          <span>{code.length} characters</span>
          <span>•</span>
          <span>{language.toUpperCase()}</span>
        </div>

        <button
          className="btn btn-primary analyze-button"
          onClick={onAnalyze}
          disabled={loading || !code.trim()}
        >
          {loading ? (
            <>
              <span className="button-spinner"></span>
              Analyzing...
            </>
          ) : (
            <>
              Analyze Code
              <span className="button-arrow">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}