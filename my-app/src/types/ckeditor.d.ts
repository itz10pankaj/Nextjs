// src/ckeditor.d.ts
declare module '@ckeditor/ckeditor5-react' {
  import { ComponentType } from 'react';

  interface CKEditorProps {
    editor: any;
    data?: string;
    config?: object;
    onReady?: (editor: any) => void;
    onChange?: (event: any, editor: any) => void;
    onBlur?: (event: any, editor: any) => void;
    onFocus?: (event: any, editor: any) => void;
  }

  export const CKEditor: ComponentType<CKEditorProps>;
}
