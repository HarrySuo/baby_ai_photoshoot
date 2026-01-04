export enum AppStep {
  HOME = 'HOME',
  UPLOAD = 'UPLOAD',
  TEMPLATE = 'TEMPLATE',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
}

export interface Photo {
  id: string;
  file: File;
  previewUrl: string;
  rotation: number; // 0, 90, 180, 270
  isValidating?: boolean;
  hasFace?: boolean;
}

export interface GeneratedPhoto {
  id: string;
  url: string;
  originalPhotoId: string;
  templateName: string;
}

export interface TemplateScene {
  id: string;
  name: string;
  description: string;
  promptPart: string;
}

export interface TemplateStyle {
  id: string;
  name: string;
  description: string;
  promptPart: string;
}
