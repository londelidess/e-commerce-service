import React, {  useState } from "react";
import { useDispatch } from "react-redux";
import { updateProductThunk } from "../../store/product";
import {thunkAddMediaToProduct,thunkDeleteMedia} from "../../store/media"
import { useHistory } from "react-router-dom";
import "./products.css";

const UpdateProductForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    
    return {

    }
}

export default UpdateProductForm;
