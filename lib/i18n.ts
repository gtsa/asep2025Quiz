import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "el",
    supportedLngs: ["el", "en"],
    resources: {
      el: {
        translation: {
          title: "Εξάσκηση ΑΣΕΠ 2025",
          footer: "Σύρε ή πάτησε για πλοήγηση",
          question: "Ερώτηση",
          optionLabels: ["α", "β", "γ", "δ"],
          questions: "ερωτήσεις",
          yourNumber: "Ερωτήσεις; (Δικό σου Αριθμός)",
          shuffled: "Ανακατεμένες Απαντήσεις",
          howMany: "Πόσες ερωτήσεις θέλεις για εξάσκηση;",
          howManyShort: "Πόσες",
          loading: "Φόρτωση ερωτήσεων...",
          pleaseWait: "Παρακαλούμε περιμένετε όσο ετοιμάζουμε το κουίζ σας.",
          errorTitle: "Ουπς! Κάτι πήγε στραβά.",
          noAnswer: "Δεν βρέθηκε η ερώτηση.",
          tryAgain: "Δοκίμασε ξανά",
          noQuestions: "Δεν υπάρχουν διαθέσιμες ερωτήσεις.",
          checkLater: "Παρακαλούμε ελέγξτε ξανά αργότερα.",
          yourAnswers: "Οι απαντήσεις σου",
          all: "Όλες",
          wrongAnswers: "Λάθος Απαντήσεις",
          noWrong: "Καμμία λάθος απάντηση 🎉",
          success: "Επιτυχία",
          encouragement: "Προσπάθησε περισσότερο — μπορείς να τα καταφέρεις!",
          correct: "Απάντησες σωστά",
          on: "στις",
          finalMessage100: "Τέλεια επίδοση! 🎯",
          finalMessage75: "Σχεδόν τέλεια! Μπράβο σου!",
          finalMessage50: "Συνέχισε έτσι, είσαι σε καλό δρόμο!",
          finalMessageElse: "Επανάληψη και προσπάθησε ξανά!",
          of: "από",
          answered: "απαντήθηκαν",
          selectedCategories: "Επιλεγμένες κατηγορίες:",
          previous: "Προηγούμενη",
          next: "Επόμενη",
          finish: "Τέλος",
          yourAnswer: "Απάντησή σου:",
          correctAnswer: "Σωστό:",
          chooseCategories: "Διάλεξε κατηγορίες για εξάσκηση:",
          installLine1: "Εγκαταστήστε την",
          installLine2: "για καλύτερη εμπειρία πλήρους οθόνης!",
          installButton: "Εγκατάσταση",
          laterButton: "Ίσως αργότερα"
}
        }
      },
      en: {
        translation: {
          title: "ASEP 2025 Practice",
          footer: "Drag or tap to navigate",
          question: "Question",
          optionLabels: ["A", "B", "C", "D"],
          questions: "questions",
          yourNumber: "Questions (Your number)",
          shuffled: "Shuffled answers",
          howMany: "How many questions do you want to practice?",
          howManyShort: "How many",
          loading: "Loading questions...",
          pleaseWait: "Please wait while we prepare your quiz.",
          errorTitle: "Oops! Something went wrong.",
          noAnswer: "Question not found.",
          tryAgain: "Try Again",
          noQuestions: "No questions available.",
          checkLater: "Please check back later.",
          yourAnswers: "Your answers",
          all: "All",
          wrongAnswers: "Wrong Answers",
          noWrong: "No wrong answers 🎉",
          success: "Success",
          encouragement: "Try harder — you can do it!",
          correct: "You got right",
          on: "out of",
          finalMessage100: "Perfect score! 🎯",
          finalMessage75: "Almost perfect! Well done!",
          finalMessage50: "Keep going, you're doing well!",
          finalMessageElse: "Review and try again!",
          of: "of",
          answered: "answered",
          selectedCategories: "Selected categories:",
          previous: "Previous",
          next: "Next",
          finish: "Finish",
          yourAnswer: "You answered:",
          correctAnswer: "Correct answer:",
          chooseCategories: "Choose categories to practice:",
          installLine1: "Install",
          installLine2: "for a better fullscreen experience!",
          installButton: "Install",
          laterButton: "Maybe Later"
        }
    }
  })

export default i18n
