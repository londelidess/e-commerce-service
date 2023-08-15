import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProductThunk,fetchAllProducts } from "../../store/product";
import { thunkAddMediaToProduct } from "../../store/media";
import { useHistory } from "react-router-dom";
import "./products.css";

const CreateProductForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [touched, setTouched] = useState({
        name: false,
        description: false,
        price: false,
        categoryId: false
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/products/categories");
                if (!response.ok) {
                    throw new Error("Failed to fetch categories.");
                }
                const data = await response.json();
                console.log('fetch categories',data)
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const validate = (fieldName) => {
        const validationErrors = {};

        if (fieldName === "name" || !fieldName) {
            if (!name || name.length < 3 || name.length > 255) {
                validationErrors.name = "Name must be between 3 and 255 characters.";
            }
        }

        if (fieldName === "description" || !fieldName) {
            if (!description || description.length < 5 || description.length > 255) {
                validationErrors.description = "Description must be between 5 and 255 characters.";
            }
        }

        if (fieldName === "price" || !fieldName) {
            if (!price || price <= 0) {
                validationErrors.price = "Price must be a positive value.";
            }
        }

        if (fieldName === "categoryId" || !fieldName) {
            if (!categoryId) {
                validationErrors.categoryId = "Category ID is required.";
            }
        }

        return validationErrors;
    };

    useEffect(() => {
        if (touched.name) {
            setErrors(validate("name"));
        }
    }, [name, touched.name]);

    useEffect(() => {
        if (touched.description) {
            setErrors(validate("description"));
        }
    }, [description, touched.description]);

    useEffect(() => {
        if (touched.price) {
            setErrors(validate("price"));
        }
    }, [price, touched.price]);

    useEffect(() => {
        if (touched.categoryId) {
            setErrors(validate("categoryId"));
        }
    }, [categoryId, touched.categoryId]);

    const handleImageChange = (setImageFunction, e) => {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (file.size > maxSize) {
            alert("File is too large. Please upload a file smaller than 5MB.");
            return;
        }

        setImageFunction(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(fetchAllProducts());
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const productData = {
            name,
            description,
            price,
            category_id: categoryId,
        };
        // console.log('productData',productData)
        console.log("Submitting form...");
        try {

            const productId = await dispatch(createProductThunk(productData));

            const images = [image, image2, image3];

            for (let img of images) {
                if (img && productId) {
                    await dispatch(thunkAddMediaToProduct(productId, img));
                }
            }

            history.push("/products/manage");
        } catch (err) {
            setErrors({
                ...validationErrors,
                general: err.message.split("\n"),
            });
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
        {touched.name && errors.name && <div className="error">{errors.name}</div>}
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => {
                  setName(e.target.value);
                  setTouched((prev) => ({ ...prev, name: true }));
              }}
              required
            />
          </label>
          {touched.description && errors.description && <div className="error">{errors.description}</div>}
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => {
                  setDescription(e.target.value);
                  setTouched((prev) => ({ ...prev, description: true }));
              }}
              required
            />
          </label>
          {touched.price && errors.price && <div className="error">{errors.price}</div>}
          <label>
            Price:$
            <input
              type="number"
              value={price}
              onChange={(e) => {
                  setPrice(e.target.value);
                  setTouched((prev) => ({ ...prev, price: true }));
              }}
              required
            />
          </label>
          {touched.categoryId && errors.categoryId && <div className="error">{errors.categoryId}</div>}
          <select
          value={categoryId}
          onChange={(e) => {
              setCategoryId(e.target.value);
              setTouched((prev) => ({ ...prev, categoryId: true }));
          }}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
            </select>
            <label>
                Preview Image:
                <input
                    type="file"
                    onChange={(e) => handleImageChange(setImage, e)}
                />
            </label>
            <label>
                Image2:
                <input
                    type="file"
                    onChange={(e) => handleImageChange(setImage2, e)}
                />
            </label>
            <label>
                Image3:
                <input
                    type="file"
                    onChange={(e) => handleImageChange(setImage3, e)}
                />
            </label>
          <button type="submit" disabled={Object.keys(errors).length > 0}>Create Product</button>
        </form>
        </div>
      );
    };
export default CreateProductForm;
