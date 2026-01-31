import { ArrowLeft, ArrowRight, Save, Check, Send } from "lucide-react";

function Button({
  onClose,
  onSubmit,
  variant = "continue", // "continue" | "save" | "submit"
  backText = "Back",
  continueText = "Continue",
}) {
  const getIcon = () => {
    switch (variant) {
      case "save":
        return <Save className="w-4 h-4" />;
      case "submit":
        return <Send className="w-4 h-4" />;
      case "check":
        return <Check className="w-4 h-4" />;
      default:
        return (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        );
    }
  };

  const getButtonText = () => {
    switch (variant) {
      case "save":
        return "Save";
      case "submit":
        return "Submit";
      case "check":
        return "Complete";
      default:
        return continueText;
    }
  };

  return (
    <div className="flex justify-between px-4 md:justify-end gap-3 py-6 md:px-10 border-t border-slate-200 bg-slate-50">
      <button
        type="button"
        className="px-7 py-3 rounded-lg font-medium text-sm cursor-pointer transition-all bg-white text-slate-800 border-[1.5px] border-slate-200 hover:bg-slate-50 hover:shadow-sm flex items-center gap-2 group"
        onClick={onClose}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        {backText}
      </button>

      <button
        type="button"
        className="px-7 py-3 rounded-lg font-medium text-sm cursor-pointer transition-all flex items-center gap-2 bg-sky-500 text-white shadow-md hover:bg-sky-600 hover:shadow-lg hover:-translate-y-0.5 group"
        onClick={onSubmit}
      >
        {variant === "continue" && getButtonText()}
        {getIcon()}
        {variant !== "continue" && getButtonText()}
      </button>
    </div>
  );
}

export default Button;
