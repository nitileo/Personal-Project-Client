import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import useProductStore from "../stores/productStore";

const Product = () => {
  const products = useProductStore((state) => state).products;
  const categories = useProductStore((state) => state.categories);
  const actionGetProduct = useProductStore((state) => state.actionGetProduct);
  const actionGetCategory = useProductStore((state) => state.actionGetCategory);
  const actionSearch = useProductStore((state) => state.actionSearch);
  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearch({ query: text });
      } else {
        actionGetProduct();
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  const getAllData = async () => {
    try {
      actionGetProduct();
      actionGetCategory();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (e) => {
    const inCheck = e.target.value; // ค่าที่เรา ติ๊ก
    const inState = [...categorySelected]; // [1,2,3] arr ว่าง
    const findCheck = inState.indexOf(inCheck); // ถ้าไม่เจอ จะ return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearch({ category: inState });
    } else {
      actionGetProduct();
    }
  };

  return (
    <div className="w-full h-auto pt-[64px] flex">
      <div className="w-[15%] min-w-[200px] h-auto bg-gray-100 p-4 rounded-md shadow-lg">
        <label className="block text-lg font-semibold mb-2 text-gray-500">
          SEARCH
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="ค้นหาสินค้า...."
            className="border border-gray-500 bg-white text-gray-500 rounded-md w-full mb-4 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </label>
        <div>
          <h1 className="text-xl font-semibold mb-3 text-gray-500">
            หมวดหมู่สินค้า
          </h1>
          <div className="space-y-2">
            {categories.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  onChange={handleCheck}
                  value={item.id}
                  type="checkbox"
                  className="h-4 w-4 accent-blue-500"
                />
                <label className="text-gray-500">{item.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[85%] h-auto bg-white py-10 px-[72px]">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">All Product</h1>
        <div className="grid grid-cols-4 ml-10">
          {products.map((el, index) => (
            <ProductCard el={el} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
