import {Fragment} from 'react';
import {createElement} from 'react-native';
import {ChildStep} from '../components/Steps';

export type ViewType = 'text' | 'image' | 'picto' | 'video';

export type ResponseStep = {
  id: number;
  task: number;
  type: ViewType;
  title: string;
  text: string;
  position: number;
  pictogram: string | null;
  pictogram_description: string | null;
  image: string | null;
  video: string | null;
  is_done: boolean;
};

export type Step = {
  id: number;
  task: number;
  type: ViewType;
  title: string;
  text: string;
  position: number;
  picto: string | null;
  pictoDescription: string | null;
  image: string | null;
  video: string | null;
  isDone: boolean;
};

export type Task = {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string;
  image: string | null;
  pictogram: string | null;
  isDone: boolean;
  pupil: number | null;
  pupilName: string | null;
  description: string | null;
  steps: Step[];
};

export type ResponseTask = {
  id: number;
  title: string;
  start_date: string | null;
  end_date: string;
  image: string | null;
  pictogram: string | null;
  pictogram_description: string | null;
  is_done: boolean;
  pupil: number | null;
  pupil_name: string | null;
  steps: ResponseStep[];
};

export type ResponsePupil = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  calculate_command_totals: boolean;
  type_of_view: ViewType;
};

export type Pupil = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  calculateCommandTotals: boolean;
  viewType: ViewType;
};

export const emptyStep: ChildStep = {
  id: -1,
  element: createElement(Fragment, undefined, null),
  isDone: false,
};
