import { useState } from "react";
import { supabase } from '../utils/supabase.js'

export default function InsertData() {
  const [title, setTitle] = useState("");
  const [upload, setUpload] = useState(true);
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpload(false);
    try {
      
      // Upload PDF
      let pdfPath = "";
      if (pdfFile) {
        const pdfName = Date.now() + "_" + pdfFile.name;
        const { error: pdfError } = await supabase.storage.from("Product").upload(`Pdf/${pdfName}`, pdfFile);
        if (pdfError) throw pdfError;
        pdfPath = pdfName;
      }

      // Save Data in Table
      const { error: dbError } = await supabase.from("employees").insert([
        {
          title,
          pdf_file: pdfPath,
        },
      ]);

      if (dbError) throw dbError;

      alert("Data Uploaded Successfully");

      // Reset Form
      setTitle("");
      setPdfFile(null);

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setUpload(true);
  };

  return (
    <div className="w-full place-items-center font-bold">
      <a href="https://coursaa-main.vercel.app/courses/delta-library">Course</a>
      <a href="https://docs.google.com/document/d/12zBrxTsCn4Ut35HQpaK0vLQhOMswigUGarTFAYSpsag/edit?usp=sharing">Docs</a>
      <form onSubmit={handleSubmit} className="w-2/3 grid grid-cols-1 place-items-stretch gap-4">
        <div className="flex justify-between items-center">
          <label>Title</label>
          <input type="text" name="title" className="border-2 mx-4 p-1 rounded-md w-6/12 border-black" value={title} onChange={(e)=>setTitle(e.value)} required />
        </div>



        <div className="flex justify-between items-center">
          <label>PDF File</label>
          <input type="file" accept=".pdf" className="border-2 mx-4 p-1 rounded-md w-6/12 border-black" onChange={(e) => setPdfFile(e.target.files[0])} required />
        </div>


        {upload && (<button type="submit" className="border-2 mx-4 p-1 rounded-md w-1/3 mt-8 right-80 border-black">Submit</button>)}

      </form >
    </div >
  );
}