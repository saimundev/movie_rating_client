import Banner from "@/components/home/Banner";
import RatedMovies from "@/components/home/RatedMovies";
import UpComingMovies from "@/components/home/UpComingMovies";
import WatchList from "@/components/home/WatchList";

import Header from "@/components/shared/Header";
import { Fragment } from "react";

export default function Home() {

  return (
    <Fragment >
      <Header />
      <Banner />
      <UpComingMovies />
      <RatedMovies />
      <WatchList />
    </Fragment>
  );
}
