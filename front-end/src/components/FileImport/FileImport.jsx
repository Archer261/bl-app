import React from 'react'
import { useDropzone } from 'react-dropzone';

const FileImport = (props) => {
    const {
        open,
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map(e => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ));

    return (

        <div
            {...getRootProps()}
            className={`p-4 border-2 border-dashed rounded-lg ${isDragActive ? 'border-blue-500' : 'border-gray-300'
                }`}
        >
            <input {...getInputProps()} />
            {isDragActive ? (

                <>
                    <p className="text-blue-500">Drag 'n' drop some files here, or click to select files</p>
                    <em>(Only *.jpeg and *.png images will be accepted)</em>
                </>

            ) : (
                <>
                    <p>Drag and drop files here, or click to browse.</p>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-1 rounded-full transition duration-300 transform hover:scale-90' type="button" onClick={open}>
                        Choose File(s)
                    </button>
                </>
            )}


        </div>

    );
}

export default FileImport