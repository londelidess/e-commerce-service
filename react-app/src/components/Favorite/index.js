import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import {
    fetchFavorites,
    removeProductFromFavorites
  } from "../../store/favorite";

function Favorite() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);




  if (!sessionUser) return <Redirect to="/" />;

  return
}
export default Favorite;
