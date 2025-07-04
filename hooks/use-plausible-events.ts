export const trackQuizStarted = (props: Record<string, any> = {}) => {
  window.plausible?.('quiz_started', { props });
};

export const trackQuizFinished = (props: Record<string, any> = {}) => {
  window.plausible?.('quiz_finished', { props });
};

export const trackScreenView = (screenType: string, props: Record<string, any> = {}) => {
  window.plausible?.('quiz_screen_viewed', {
    props: { screenType, ...props },
  });
};
