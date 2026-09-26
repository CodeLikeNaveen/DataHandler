import { useEffect, useState } from "react";
import { supabaseUrl } from '../utils/supabase.js'


export default function SelectData() {
  const [filteredData, setFilteredData] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
  });

  // Fetch Data
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("id");

    if (error) {
      console.log(error);
      return;
    }

    setEmployees(data);
    setFilteredData(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter Logic
  useEffect(() => {
    let temp = [...employees];

    if (filters.title) {
      temp = temp.filter((item) =>
        item.title
          ?.toLowerCase()
          .includes(filters.title.toLowerCase())
      );
    }


    setFilteredData(temp);
  }, [filters, employees]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });

  };
  const handleEdit = (item) => {
    console.log(item);
  };
  const handleDelete = async (item) => {
    if (!item) return alert("Enter file name");

    const result = window.confirm("Are you sure?");

    if(!result) return

    const { e1 } = await supabase.storage.from("Product") 
      .remove([`Pdf/${item.pdf_file}`]);

    const { e2 } = await supabase.from("employees") 
      .delete().eq("id",item.id);
  
    if(e1 || e2){
      alert("Error")
    }
    alert("File removed");
  };


  return (
    <div>

      {/* Filters */}
      <div className="w-full flex gap-7 mx-4">
        <input className="border-2 mx-4 p-1 rounded-md w-80 border-black" type="text" name="title" placeholder="Filter by Title" value={filters.title} onChange={handleFilterChange} />
      </div>

      <br />

      <h2 className="font-bold text-center bg-slate-400 text-3xl p-4 text-white">Product Records</h2>
      {/* Table */}
      <table border="1" cellPadding="10" className="mx-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => {
              const pdfUrl = `${supabaseUrl}/storage/v1/object/public/Product/Pdf/${item.pdf_file}`;

              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>

                  <td>{item.pdf_file &&     (<a className="border-2 border-black rounded-3xl p-2 font-bold" href={pdfUrl} target="_blank" rel="noreferrer">View PDF</a>)}</td>
                  
                  {/* <td><button onClick={() => handleEdit(item)}>📝</button></td> */}
                  <td><button onClick={() => handleDelete(item)}>❌</button></td>
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

