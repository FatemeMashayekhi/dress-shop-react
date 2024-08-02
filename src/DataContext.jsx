/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterSize, setFilterSize] = useState("");
  const queryClient = useQueryClient();

  const sortOrderHandler = (text) => {
    if (text == "Highest") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  const filterSizeHandler = (text) => {
    if (text == "All") {
      setFilterSize("");
    } else {
      setFilterSize(text);
    }
  };

  // const filterSizeHandler = (text) => {
  //   switch (text) {
  //     case "All":
  //       setFilterSize("");
  //       break;
  //     case "XS":
  //       setFilterSize("XS");
  //       break;
  //     case "S":
  //       setFilterSize("S");
  //       break;
  //     case "M":
  //       setFilterSize("M");
  //       break;
  //     case "L":
  //       setFilterSize("L");
  //       break;
  //     case "XL":
  //       setFilterSize("XL");
  //       break;
  //     case "XXL":
  //       setFilterSize("XXL");
  //       break;
  //     default:
  //       setFilterSize("");
  //   }
  // };

  const selectedImgHandler = (id) => {
    setShowModal(true);
    setSelectedProductId(id);
  };

  // const { data } = useQuery({
  //   queryKey: ["getData", sortOrder, filterSize],
  //   queryFn: async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/products?_sort=price&_order=${sortOrder}&size=${filterSize}`
  //       );
  //       return response.data;
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   },
  // });

  const { data } = useQuery({
    queryKey: ["getData", sortOrder, filterSize],
    queryFn: async () => {
      try {
        const baseUrl = `http://localhost:3000/products?_sort=price&_order=${sortOrder}`;
        const url = filterSize ? `${baseUrl}&size=${filterSize}` : baseUrl;
        const response = await axios.get(url);
        return response.data;
      } catch (e) {
        console.log(e.message);
      }
    },
  });

  const { data: cartData } = useQuery({
    queryKey: ["getCart"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        return response.data;
      } catch (e) {
        console.log(e.message);
      }
    },
  });

  const postCart = useMutation({
    mutationFn: async (cart) => {
      try {
        const response = await axios.post("http://localhost:3000/cart", cart);
      } catch (e) {
        console.log(e.message);
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries("getCart");
    },
  });

  const putCart = useMutation({
    mutationFn: async (product) => {
      try {
        const response = await axios.put(
          `http://localhost:3000/cart/${product.id}`,
          product
        );
      } catch (e) {
        console.log(e.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getCart");
    },
  });

  // const addCartHandler = (id) => {
  //   const isExist = !!cartData.find((item) => item.id === id);
  //   if (isExist) {
  //     // Handle the case where the product already exists in the cart
  //   } else {
  //     if (data) {
  //       const product = data?.find((item) => item.id === id);
  //       if (product) {
  //         const cartItem = { ...product, quantity: 1 };
  //         postCart.mutate(cartItem);
  //       }
  //     }
  //   }
  // };

  const addCartHandler = (id) => {
    const existingProduct = cartData.find((item) => item.id === id);
    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        quantity: existingProduct.quantity + 1,
      };
      putCart.mutate(updatedProduct);
    } else {
      if (data) {
        const product = data?.find((item) => item.id === id);
        if (product) {
          const cartItem = { ...product, quantity: 1 };
          postCart.mutate(cartItem);
        }
      }
    }
  };

  const deleteCart = useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axios.delete(`http://localhost:3000/cart/${id}`);
        return response.data;
      } catch (e) {
        console.log(e.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getCart");
    },
  });

  const removeHandler = (id) => {
    deleteCart.mutate(id);
  };

  useEffect(() => {
    if (cartData) {
      const calcPriceArray = cartData.map((item) => item.price * item.quantity);
      const total = calcPriceArray.reduce((acc, num) => acc + num, 0);
      setTotalPrice(total);
    }
  }, [cartData]);

  return (
    <DataContext.Provider
      value={{
        data,
        setShowModal,
        showModal,
        selectedImgHandler,
        selectedProductId,
        setShowForm,
        showForm,
        cartData,
        addCartHandler,
        removeHandler,
        totalPrice,
        sortOrderHandler,
        filterSizeHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
