'use client';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function CustomEditor({ initialData }: { initialData: string }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto z-0">
            <CKEditor
                editor={ClassicEditor as any}
                data={initialData}
                config={{
                    toolbar: [
                        "heading", "|",
                        "bold", "italic", "|",
                        "bulletedList", "numberedList", "|",
                        "insertTable", "|",
                        "uploadImage", "mediaEmbed", "|",
                        "undo", "redo"
                    ]
                }}
                 onReady={(editor) => {
                    const toolbarElement = editor.ui.view.toolbar.element;
                    if (toolbarElement) {
                        toolbarElement.style.zIndex = '10'; // or any lower value
                    }
                }}
                onChange={(_: unknown, editor: any) => {
                    const data = editor.getData();
                    console.log({ data });
                }}
            />
        </div>
    );
}

export default CustomEditor;
