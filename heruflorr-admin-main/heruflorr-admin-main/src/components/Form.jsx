/* eslint-disable react/prop-types */

const FormComponent = ({
  nama,
  setNama,
  harga,
  setHarga,
  jenis,
  setJenis,
  setImage,
  handleSubmit,
}) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border px-8 p-5 w-full"
      >
        <label htmlFor="nama" className="mb-3">
          Nama Tanaman
        </label>
        <input
          type="text"
          id="nama"
          placeholder="Nama Tanaman"
          className="p-2 border-2 mb-6 border-slate-600"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <label htmlFor="harga" className="mb-3">
          Harga
        </label>
        <input
          type="number"
          id="harga"
          placeholder="Harga"
          className="p-2 border-2 mb-6 border-slate-600"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />
        <label htmlFor="jenis" className="mb-3">
          Jenis Tanaman
        </label>
        <select
          id="jenis"
          className="w-1/2 border-2 px-2 py-2 mb-5 border-slate-600"
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
        >
          <option value="tanaman kecil">Tanaman Kecil</option>
          <option value="tanaman besar">Tanaman Besar</option>
        </select>
        <label htmlFor="image" className="mb-3">
          Gambar
        </label>
        <input
          type="file"
          id="image"
          // value={image}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" className="mt-5 p-2 bg-blue-500 text-white">
          Submit
        </button>
      </form>
    </>
  );
};

export default FormComponent;
