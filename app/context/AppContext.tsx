import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuestionnaireAnswers, Practitioner } from '../types';

interface AppContextType {
  // Questionnaire state
  questionnaireCompleted: boolean;
  questionnaireAnswers: QuestionnaireAnswers | null;
  completeQuestionnaire: (answers: QuestionnaireAnswers) => Promise<void>;
  resetQuestionnaire: () => Promise<void>;

  // Profile state
  savedProfiles: Practitioner[];
  dismissedProfiles: Practitioner[];
  saveProfile: (profile: Practitioner) => void;
  removeSavedProfile: (profileId: string) => void;
  dismissProfile: (profile: Practitioner) => void;
  removeDismissedProfile: (profileId: string) => void;

  // Feed state
  feedIndex: number;
  setFeedIndex: (index: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const QUESTIONNAIRE_KEY = '@therapy_questionnaire_data';
const SAVED_PROFILES_KEY = '@therapy_saved_profiles';
const DISMISSED_PROFILES_KEY = '@therapy_dismissed_profiles';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Questionnaire state
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers | null>(null);

  // Profile state
  const [savedProfiles, setSavedProfiles] = useState<Practitioner[]>([]);
  const [dismissedProfiles, setDismissedProfiles] = useState<Practitioner[]>([]);

  // Feed state
  const [feedIndex, setFeedIndex] = useState(0);

  // Load saved state on app start
  useEffect(() => {
    loadSavedState();
  }, []);

  const loadSavedState = async () => {
    try {
      // Load questionnaire data
      const questionnaireData = await AsyncStorage.getItem(QUESTIONNAIRE_KEY);
      if (questionnaireData) {
        const parsed = JSON.parse(questionnaireData);
        setQuestionnaireCompleted(parsed.completed);
        setQuestionnaireAnswers(parsed.answers);
      }

      // Load saved profiles
      const savedProfilesData = await AsyncStorage.getItem(SAVED_PROFILES_KEY);
      if (savedProfilesData) {
        setSavedProfiles(JSON.parse(savedProfilesData));
      }

      // Load dismissed profiles
      const dismissedProfilesData = await AsyncStorage.getItem(DISMISSED_PROFILES_KEY);
      if (dismissedProfilesData) {
        setDismissedProfiles(JSON.parse(dismissedProfilesData));
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
  };

  const completeQuestionnaire = async (answers: QuestionnaireAnswers) => {
    try {
      const data = {
        completed: true,
        answers,
      };
      await AsyncStorage.setItem(QUESTIONNAIRE_KEY, JSON.stringify(data));
      setQuestionnaireCompleted(true);
      setQuestionnaireAnswers(answers);
    } catch (error) {
      console.error('Error saving questionnaire:', error);
    }
  };

  const resetQuestionnaire = async () => {
    try {
      await AsyncStorage.removeItem(QUESTIONNAIRE_KEY);
      setQuestionnaireCompleted(false);
      setQuestionnaireAnswers(null);
    } catch (error) {
      console.error('Error resetting questionnaire:', error);
    }
  };

  const saveProfile = async (profile: Practitioner) => {
    try {
      const newSavedProfiles = [...savedProfiles, profile];
      await AsyncStorage.setItem(SAVED_PROFILES_KEY, JSON.stringify(newSavedProfiles));
      setSavedProfiles(newSavedProfiles);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const removeSavedProfile = async (profileId: string) => {
    try {
      const newSavedProfiles = savedProfiles.filter(p => p.id !== profileId);
      await AsyncStorage.setItem(SAVED_PROFILES_KEY, JSON.stringify(newSavedProfiles));
      setSavedProfiles(newSavedProfiles);
    } catch (error) {
      console.error('Error removing saved profile:', error);
    }
  };

  const dismissProfile = async (profile: Practitioner) => {
    try {
      const newDismissedProfiles = [...dismissedProfiles, profile];
      await AsyncStorage.setItem(DISMISSED_PROFILES_KEY, JSON.stringify(newDismissedProfiles));
      setDismissedProfiles(newDismissedProfiles);
    } catch (error) {
      console.error('Error dismissing profile:', error);
    }
  };

  const removeDismissedProfile = async (profileId: string) => {
    try {
      const newDismissedProfiles = dismissedProfiles.filter(p => p.id !== profileId);
      await AsyncStorage.setItem(DISMISSED_PROFILES_KEY, JSON.stringify(newDismissedProfiles));
      setDismissedProfiles(newDismissedProfiles);
    } catch (error) {
      console.error('Error removing dismissed profile:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        questionnaireCompleted,
        questionnaireAnswers,
        completeQuestionnaire,
        resetQuestionnaire,
        savedProfiles,
        dismissedProfiles,
        saveProfile,
        removeSavedProfile,
        dismissProfile,
        removeDismissedProfile,
        feedIndex,
        setFeedIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 