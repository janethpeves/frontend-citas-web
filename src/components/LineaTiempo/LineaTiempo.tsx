import { useEffect, useState } from 'react';
import style from "./LineaTiempo.module.css";

interface Step {
  id: number;
  label: string;
}

interface LineaTiempoProps {
  steps: Step[];
  currentStep: number;
  onClickStep?: (id: number) => void;
  showLabels?: boolean;
}

export const LineaTiempo = ({ 
  steps, 
  currentStep, 
  onClickStep, 
  showLabels = true 
}: LineaTiempoProps) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const completed = steps
      .filter(step => step.id < currentStep)
      .map(step => step.id);
    setCompletedSteps(completed);
  }, [currentStep, steps]);

  return (
    <section className={style.stepWizard} role="navigation" aria-label="Progress">
      <ul className={style.stepWizardList}>
        {steps?.map((step, index) => (
          <li
            key={step.id}
            className={`${style.stepWizardItem} ${
              currentStep === step.id ? style.active : ''
            } ${
              completedSteps.includes(step.id) ? style.completed : ''
            }`}
            style={{ '--item-index': index } as React.CSSProperties}
          >
            <button 
              className={style.progressCount}
              onClick={() => onClickStep && onClickStep(step.id)}
              aria-current={currentStep === step.id ? 'step' : undefined}
              aria-label={`Step ${step.id} ${
                completedSteps.includes(step.id) 
                  ? 'completed' 
                  : currentStep === step.id 
                    ? 'current' 
                    : 'pending'
              }`}
              disabled={!onClickStep}
            >
              {step.id}
            </button>
            {showLabels && (
              <span 
                className={style.progressLabel}
                aria-hidden="true"
              >
                {step.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}