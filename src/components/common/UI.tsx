import React from "react";

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "danger";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-banana-400 hover:bg-banana-300 text-slate-900 focus:ring-banana-400 shadow-[0_0_10px_rgba(250,204,21,0.2)]",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white focus:ring-slate-500 border border-slate-600",
    text: "bg-transparent hover:bg-slate-800 text-banana-400 hover:text-banana-300",
    danger:
      "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/50 focus:ring-red-500",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">
        {label}
      </label>
      <input
        className={`w-full px-4 py-2.5 bg-slate-800 border ${
          error ? "border-red-500" : "border-slate-700"
        } rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-banana-400/50 focus:border-banana-400 transition-colors`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400 ml-1">{error}</p>}
    </div>
  );
};

// --- Card ---
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}> = ({ children, className = "", title, action }) => {
  return (
    <div
      className={`bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm ${className}`}
    >
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

// --- Badge ---
export const Badge: React.FC<{
  status:
    | "active"
    | "pending"
    | "completed"
    | "failed"
    | "suspended"
    | "verified";
}> = ({ status }) => {
  const styles = {
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    completed: "bg-green-500/10 text-green-400 border-green-500/20",
    verified: "bg-green-500/10 text-green-400 border-green-500/20",
    pending: "bg-banana-400/10 text-banana-400 border-banana-400/20",
    suspended: "bg-red-500/10 text-red-400 border-red-500/20",
    failed: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        styles[status] || styles.pending
      } capitalize`}
    >
      {status}
    </span>
  );
};

// --- Modal/Dialog ---
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-slate-800 rounded-xl border border-slate-700 shadow-2xl w-full max-w-md p-6 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
