export type ExerciseType =
  | 'gap_text'
  | 'word_definition'
  | 'true_false'
  | 'question_answer'
  | 'translate';

export type GapTextType =
  | 'wordList'
  | 'verb'
  | 'adjective'
  | 'noun';

export type VerbConditionKey =
  | 'verbForm'
  | 'modalVerb'
  | 'modus'
  | 'kasus'
  | 'activeForm';

export type AdjectiveConditionKey =
  | 'article'
  | 'kasus'
  | 'comparison';

export type NounConditionKey =
  | 'article'
  | 'kasus';

export interface TaskCardOption {
  id: ExerciseType;
  label: string;
}

export interface ExerciseConditionOption<T extends string> {
  id: T;
  label: string;
}

export interface WordListGapCondition {
  type: 'wordList';
  wordList: string;
}

export interface VerbGapCondition {
  type: 'verb';
  condition: VerbConditionKey;
  value: string | null;
}

export interface AdjectiveGapCondition {
  type: 'adjective';
  condition: AdjectiveConditionKey;
  value: string | null;
}

export interface NounGapCondition {
  type: 'noun';
  condition: NounConditionKey;
  value: string | null;
}

export type GapTextCondition =
  | WordListGapCondition
  | VerbGapCondition
  | AdjectiveGapCondition
  | NounGapCondition;

export interface ExerciseCondition {
  exerciseType: ExerciseType;
  gapText?: GapTextCondition;
  wordList?: string | null;
  count?: number;
}

export type VerbConditionRequest = Partial<Record<VerbConditionKey, string | null>>;
export type AdjectiveConditionRequest = Partial<Record<AdjectiveConditionKey, string | null>>;
export type NounConditionRequest = Partial<Record<NounConditionKey, string | null>>;

export interface GapTextExerciseRequest {
  wordList?: string | null;
  selectedType: GapTextType[];
  verb?: VerbConditionRequest;
  adjective?: AdjectiveConditionRequest;
  noun?: NounConditionRequest;
}

export interface WordDefinitionExerciseRequest {
  wordList?: string | null;
}

export interface CountExerciseRequest {
  count: number;
}

export interface ExerciseRequestDto {
  text: string;
  gap_text?: GapTextExerciseRequest;
  word_definition?: WordDefinitionExerciseRequest;
  true_false?: CountExerciseRequest;
  question_answer?: CountExerciseRequest;
  translate?: CountExerciseRequest;
}

export interface GapTextExerciseResult {
  text: string;
  answers: { id: number; answer: string }[];
}

export interface TrueFalseExerciseResult {
  statements: { id: number; statement: string; answer: boolean }[];
}

export interface QuestionAnswerExerciseResult {
  questions: { id: number; question: string; answer: string }[];
}

export interface TranslateExerciseResult {
  translations: { id: number; source: string; target: string }[];
}

export interface WordDefinitionExerciseResult {
  definitions: { word: string; definition: string }[];
}

export interface ExercisePreviewResult {
  gap_text?: GapTextExerciseResult;
  true_false?: TrueFalseExerciseResult;
  question_answer?: QuestionAnswerExerciseResult;
  translate?: TranslateExerciseResult;
  word_definition?: WordDefinitionExerciseResult;
}

export interface BaseText {
  id: string;
  name: string;
  text: string;
}
