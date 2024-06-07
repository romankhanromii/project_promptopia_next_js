import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discover & Share</h1>
      <br className="max-md:hidden " />
      <span className="orange_gradient text-center">AI-Powered Prompts</span>
      <p className="desc text-center">
        Promoptopia is a open source AI prompting tool for modern word at
        discover,create and share creative Prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
