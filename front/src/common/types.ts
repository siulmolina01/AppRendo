export type Step = {
  number?: number;
  title?: string;
  file?: any;
  type?: 'text' | 'img' | 'video' | 'picto';
};

export interface StepProp {
  index: number;
  onChangeStep: (step: Step, index: number, type: string) => void;
  step: Step;
}
export interface ITask {
  taskTitle: string;
  pupilName: string | null;
  taskId: number;
  pupilId: number | null;
}

export interface IResponseTask {
  id: number;
  title: string;
  start_date: string | null;
  end_date: string;
  image: string | null;
  description: string | null;
  is_done: boolean;
  pupil: number | null;
  pupil_name: string | null;
}

export type Pupil = {
  id: number;
  name: string;
  email: string | null;
  userType: string;
  user: string;
  calculate: boolean;
};

export interface IResponsePupil {
  id: number;
  password: string;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string | null;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string | Date;
  email: string | null;
  user_type: string;
  groups: [];
  user_permissions: [];
  calculate_command_totals: boolean;
}
