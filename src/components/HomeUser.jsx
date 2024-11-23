import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import useProductStore from "../stores/productStore";
import { useNavigate } from "react-router-dom";

const HomeUser = () => {
  const actionGetNewRelease = useProductStore(
    (state) => state.actionGetNewRelease
  );
  const actionGetBestSeller = useProductStore(
    (state) => state.actionGetBestSeller
  );
  const actionGetRecommend = useProductStore(
    (state) => state.actionGetRecommend
  );

  const navigate = useNavigate();

  const [newRelease, setNewRelease] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const rs = await actionGetNewRelease();
    setNewRelease(rs);
    const bs = await actionGetBestSeller();
    setBestSeller(bs);
    const rc = await actionGetRecommend();
    setRecommend(rc);
  };

  const HandleViewDetail = (el) => {
    navigate("/product/detail", { state: { el } });
  };

  return (
    <>
      <div className="pt-[72px] w-full flex justify-center pb-6">
        <Carousel className="w-3/4">
          <CarouselContent>
            {recommend.map((el, index) => (
              <CarouselItem key={index}>
                <div className="p-1 h-[325px]">
                  <Card className="h-full">
                    <CardContent className="flex w-full p-6 h-full bg-slate-50">
                      <div className="flex w-full">
                        <div className="w-3/5 flex flex-col justify-around items-start gap-3">
                          <h2 className="text-xl font-bold">{el.title}</h2>
                          <p className="px-4 text-gray-700 text-sm leading-relaxed">
                            {el.description}
                          </p>
                          <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={() => HandleViewDetail(el)}
                          >
                            View Detail
                          </button>
                        </div>
                        <div className="w-2/5">
                          <div className="w-3/5 mx-auto my-auto flex justify-center">
                            <img
                              src={
                                el.image || "https://via.placeholder.com/150"
                              }
                              alt="Book Cover"
                              className="w-[68%] object-cover rounded-md shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="px-10 flex flex-col gap-10 py-5">
        <h1 className="text-3xl font-bold">New Release</h1>
        <div className="flex justify-center">
          <Carousel className="w-3/4">
            <CarouselContent>
              {newRelease.map((el, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/5 h-full"
                >
                  <div className="p-1 h-full w-[200px]">
                    <Card className="h-full">
                      <CardContent className="flex items-center justify-between py-5 h-full flex-col gap-3 ">
                        <img
                          src={el.image || "https://via.placeholder.com/100"}
                          alt="Book Cover"
                          className="w-[90%] object-cover rounded-md cursor-pointer"
                          onClick={() => HandleViewDetail(el)}
                        />
                        <div className="font-medium text-center">
                          {el.title.length > 30
                            ? el.title.slice(0, 20) + "..."
                            : el.title}
                        </div>
                        <div className="w-full text-center text-gray-600">
                          Price: {el.price} ฿
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="px-10 flex flex-col gap-10 py-5">
        <h1 className="text-3xl font-bold">Best Seller</h1>
        <div className="flex justify-center">
          <Carousel className="w-3/4">
            <CarouselContent>
              {bestSeller.map((el, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/5 h-full"
                >
                  <div className="p-1 h-full w-[200px]">
                    <Card className="h-full">
                      <CardContent className="flex items-center justify-between py-5 h-full flex-col gap-3 ">
                        <img
                          src={el.image || "https://via.placeholder.com/100"}
                          alt="Book Cover"
                          className="w-[90%] object-cover rounded-md cursor-pointer"
                          onClick={() => HandleViewDetail(el)}
                        />
                        <div className="font-medium text-center">
                          {el.title.length > 30
                            ? el.title.slice(0, 20) + "..."
                            : el.title}
                        </div>
                        <div className="w-full text-center text-gray-600">
                          Price: {el.price} ฿
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default HomeUser;
