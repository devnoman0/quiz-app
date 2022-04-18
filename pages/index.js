export default function Home() {
  return null;
}

export async function getServerSideProps(context) {
  //TODO:: check if the user is logged in or not

  return {
    redirect: { destination: "/login" },
  };
}
