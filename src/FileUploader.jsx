import { useState } from 'react';
import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function FileUploader({ moduleId }) {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    if (!file) return;
    const filename = `${uuidv4()}_${file.name}`;
    const { error } = await supabase.storage.from('module-files').upload(filename, file);
    if (error) {
      alert('Upload failed: ' + error.message);
    } else {
      alert('File uploaded successfully!');
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload File</button>
    </div>
  );
}
