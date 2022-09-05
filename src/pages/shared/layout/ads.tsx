const Ads = () => {
  const url =
    "https://images.unsplash.com/photo-1582896911227-c966f6e7fb93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80";
  return (
    <article className="rounded-xl">
      <img src={url} alt="" className="w-full h-full object-cover rounded-xl" />
    </article>
  );
};
export default Ads;
