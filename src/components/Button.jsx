import { ArrowRight, Send, ArrowLeft } from "lucide-react";

export default function Button({
  onClose,
  onSubmit,
  type = "button",
  variant = "continue",
  backText = "Back",
  continueText = "Continue",
  loading = false,
}) {
  const getIcon = () => {
    if (loading) return null;
    switch (variant) {
      case "submit":
        return <Send className="w-4 h-4" />;
      default:
        return (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        );
    }
  };

  const getButtonText = () => {
    if (loading) return "Submitting..."; // show loading text
    switch (variant) {
      case "submit":
        return "Submit";
      default:
        return continueText;
    }
  };

  return (
    <div className="flex justify-between px-4 w-full md:justify-end gap-3 py-6 md:px-10 border-t border-slate-200 bg-slate-50">
      <button
        type="button"
        className="px-7 py-3 rounded-lg font-medium text-sm cursor-pointer transition-all bg-white text-slate-800 border-[1.5px] border-slate-200 hover:bg-slate-50 hover:shadow-sm flex items-center gap-2"
        onClick={onClose}
        disabled={loading}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        {backText}
      </button>

      <button
        type={type}
        className={`px-7 py-3 rounded-lg font-medium text-sm cursor-pointer transition-all flex items-center gap-2 shadow-md ${
          loading
            ? "bg-sky-400 cursor-not-allowed text-white"
            : "bg-sky-500 text-white hover:bg-sky-600 hover:shadow-lg hover:-translate-y-0.5"
        }`}
        onClick={onSubmit}
        disabled={loading}
      >
        {loading && (
          <svg
            className="animate-spin w-4 h-4 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
            ></path>
          </svg>
        )}
        {getButtonText()}
        {!loading && getIcon()}
      </button>
    </div>
  );
}
