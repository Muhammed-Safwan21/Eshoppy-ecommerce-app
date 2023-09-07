import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({keyword, pageNumber}) => ({
        url: PRODUCT_URL,
        params:{keyword,pageNumber}
      }),
      providesTags: ["Product"], // to avoid refresh the page
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),

      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], //stop being cached and get fresh data
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct:builder.mutation({
      query:(productId)=>({
        url:`${PRODUCT_URL}/${productId}`,
        method:'DELETE',

      })
    }),
    createReview:builder.mutation({
      query:(data)=>({
        url:`${PRODUCT_URL}/${data.productId}/reviews`,
        method:'POST',
        body:data
      }),invalidatesTags:["Product"]
    }),
    getTopProducts:builder.query({
      query:()=>({
        url:`${PRODUCT_URL}/top`,
      }),keepUnusedDataFor:5
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productsApiSlice;
