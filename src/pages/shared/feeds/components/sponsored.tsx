const Sponsored = () => {
  const url =
    "https://images.unsplash.com/photo-1662436267863-e31fea0120fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80";
  return (
    <div>
      <p className="mb-3 font-bold text-gray-600 text-start">sponsored</p>
      <div className="overflow-hidden rounded-xl">
        <figure>
          <img src={url} className="w-full h-36 object-cover" alt="" />
        </figure>
        <div className="mt-4">
          <p className="font-bold text-sky-500 text-start text-lg ">
            Olona Outsourcing
          </p>
          <p className="text-start">
            <a href="https://olona.com">www.olona.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Sponsored;
