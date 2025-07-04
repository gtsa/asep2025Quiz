export const trackQuizStarted = (props: Record<string, any> = {}) => {
  window.plausible?.('quiz_started', { props });
};

export const trackQuizFinished = (props: Record<string, any> = {}) => {
  window.plausible?.('quiz_finished', { props });
};

export const trackScreenView = (screenType: string, props: Record<string, any> = {}) => {
  // Fire a custom event
  window.plausible?.('quiz_screen_viewed', {
    props: { screenType, ...props },
  });

  // Trigger a virtual pageview (so bounce rate and pages per visit are useful)
  const slug =
    screenType === 'results'
      ? '/quiz/results'
      : screenType === 'question'
      ? `/quiz/question-${props.questionIndex ?? 'unknown'}`
      : '/quiz/loading';

  window.plausible?.('pageview', { u: slug });
};

