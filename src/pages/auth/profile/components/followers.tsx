import { Http } from "../../../../helpers/api";

export const Followers = () => {

    const res =  Http.get("/followers/").then()
   


  return (
    <>
      <h1>followers</h1>
    </>
  );
};
