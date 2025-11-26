import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Check, User, Users, Mail, Wallet } from "lucide-react";
import { Button, Input, Card } from "../../../components/common/UI";

import { useSignupStore } from "../stores/signupStore";
import { UserRole } from "../../../types/types";

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { currentStep, splitType, setSplitType, nextStep, prevStep } =
    useSignupStore();

  const steps = [
    { label: "Personal Info", icon: <User size={18} /> },
    { label: "Role", icon: <Users size={18} /> },
    { label: "Verify", icon: <Mail size={18} /> },
    { label: "Bank", icon: <Wallet size={18} /> },
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      navigate("/dashboard");
    } else {
      nextStep();
    }
  };

  const handleBack = () => {
    prevStep();
  };

  // --- Step Components ---

  const StepInfo = () => (
    <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="grid grid-cols-2 gap-4">
        <Input label="First Name" placeholder="Jane" />
        <Input label="Last Name" placeholder="Doe" />
      </div>
      <Input label="Email" type="email" placeholder="jane@banana.com" />
      <Input
        label="Password"
        type="password"
        placeholder="Create a strong password"
      />
    </div>
  );

  const StepRole = () => (
    <div className="space-y-4 animate-in slide-in-from-right-4 fade-in duration-300">
      <h3 className="text-white font-medium mb-4">
        How will you use BananaSplits?
      </h3>

      <div
        onClick={() => setSplitType(UserRole.CREATOR)}
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
          splitType === UserRole.CREATOR
            ? "border-banana-400 bg-banana-400/5"
            : "border-slate-700 bg-slate-800 hover:border-slate-600"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-white">Creator Split</span>
          {splitType === UserRole.CREATOR && (
            <div className="h-5 w-5 rounded-full bg-banana-400 text-slate-900 flex items-center justify-center">
              <Check size={12} />
            </div>
          )}
        </div>
        <p className="text-sm text-slate-400">
          I want to link my revenue sources and split money with my team
          automatically.
        </p>
      </div>

      <div
        onClick={() => setSplitType(UserRole.MEMBER)}
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
          splitType === UserRole.MEMBER
            ? "border-banana-400 bg-banana-400/5"
            : "border-slate-700 bg-slate-800 hover:border-slate-600"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-white">Member Split</span>
          {splitType === UserRole.MEMBER && (
            <div className="h-5 w-5 rounded-full bg-banana-400 text-slate-900 flex items-center justify-center">
              <Check size={12} />
            </div>
          )}
        </div>
        <p className="text-sm text-slate-400">
          I was invited to a team and need to link my bank account to get paid.
        </p>
      </div>
    </div>
  );

  const StepVerify = () => (
    <div className="text-center space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <Mail className="text-banana-400" size={32} />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">Check your email</h3>
        <p className="text-slate-400 text-sm mt-1">
          We sent a 6-digit code to{" "}
          <span className="text-white">jane@banana.com</span>
        </p>
      </div>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <input
            key={i}
            className="w-12 h-14 bg-slate-800 border border-slate-600 rounded-lg text-center text-xl font-bold text-white focus:border-banana-400 focus:outline-none focus:ring-1 focus:ring-banana-400"
            maxLength={1}
            type="text"
          />
        ))}
      </div>
      <Button variant="text">Resend Code</Button>
    </div>
  );

  const StepBank = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700 rounded-full mb-4">
          <Wallet className="text-slate-300" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white">Link Bank Account</h3>
        <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">
          Connect your bank account securely via Plaid to receive or send
          payments.
        </p>
      </div>

      <Button fullWidth variant="primary" className="h-12 text-lg">
        Connect via Plaid
      </Button>

      <Button fullWidth variant="text" onClick={handleNext}>
        I'll do this later
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center pt-12 p-4">
      {/* Stepper Header */}
      <div className="w-full max-w-3xl mb-12">
        <div className="flex justify-between relative">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2 rounded-full"></div>
          {/* Progress Bar Fill */}
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-banana-400 -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={index}
                className="flex flex-col items-center bg-slate-950 px-2"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-banana-400 border-banana-400 text-slate-900"
                      : isCurrent
                      ? "bg-slate-900 border-banana-400 text-banana-400"
                      : "bg-slate-900 border-slate-700 text-slate-600"
                  }`}
                >
                  {isCompleted ? <Check size={20} /> : step.icon}
                </div>
                <span
                  className={`text-xs mt-2 font-medium transition-colors ${
                    isCurrent
                      ? "text-banana-400"
                      : isCompleted
                      ? "text-slate-300"
                      : "text-slate-600"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md">
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              {steps[currentStep].label}
            </h2>
            <p className="text-slate-400 text-sm">
              Please fill in the details below
            </p>
          </div>

          <div className="min-h-[300px]">
            {currentStep === 0 && <StepInfo />}
            {currentStep === 1 && <StepRole />}
            {currentStep === 2 && <StepVerify />}
            {currentStep === 3 && <StepBank />}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={currentStep === 0 ? "invisible" : ""}
            >
              Back
            </Button>
            {currentStep < 3 ? (
              <Button onClick={handleNext}>Continue</Button>
            ) : null}
          </div>
        </Card>
        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-banana-400 hover:text-banana-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
