import { useEffect, useState } from "react";
import { supabase } from '../utils/supabase.js'



export default function SelectData() {
  const [images, setImages] = useState([]);
  const [img, setImg] = useState(null);
  const [upload, setUpload] = useState(true);

  // Fetch Data
  const fetchImages = async () => {
    const { data, error } = await supabase.storage
      .from("Product")
      .list("Slider");
    if (error) {
      // console.log("Error:", error.message);
      return;
    }
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async () => {
    setUpload(false);
    try {
      // Upload Image
      let imagePath = "";
      if (img) {
        const imageName = Date.now() + "_" + img.name;
        const { error: imageError } = await supabase.storage.from("Product").upload(`Slider/${imageName}`, img);
        if (imageError) throw imageError;
        imagePath = imageName;
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setUpload(true);
  }
  const handleDelete = async (img) => {
    if (!img) return alert("Select file First");

    const result = window.confirm("Are you sure?");

    if (!result) return

    const { error } = await supabase.storage.from("Product").remove([`Slider/${img}`]);

    if (error) {
      alert("Error")
    }
    alert("File removed");
  };


  return (
    <div>
      <h2 className="font-bold text-center bg-slate-400 text-3xl p-4 text-white">Slider Images</h2>
      <form action={ handleSubmit } className="w-full grid grid-cols-1 place-items-stretch gap-4 mx-auto bg-gray-200">
        <div className="w-2/3 flex justify-between items-center mx-auto my-2" >
          <label className="font-bold">Image</label>
          <input type="file" accept="image/*" className="border-2 mx-4 p-1 rounded-md w-6/12 border-black" onChange={(e) => setImg(e.target.files[0])} required />
          {upload && (<button type="submit" className="border-2 mx-4 p-1 rounded-md w-1/3 border-black">Submit</button>)}
        </div>
      </form>
      <table border="1" cellPadding="10" className="mx-auto">
        <thead>
          <tr>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {images.length > 0 ? (
            images.map((item, index) => {
              const imgUrl = `${supabaseUrl}/storage/v1/object/public/Product/Slider/${item.name}`;

              return (
                <tr key={index}>
                  <td>{item && (<img src={imgUrl} alt="Product" width="100" />)}</td>
                  <td><button onClick={() => handleDelete(item.name)}>❌</button></td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

