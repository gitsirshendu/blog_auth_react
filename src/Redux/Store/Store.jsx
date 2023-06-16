import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../authSlice";
import { blogSlice } from "../blogSlice";
import { articleSlice } from "../articleSlice";
import { categorySlice } from "../categorySlice";
import { latestBlogSlice } from "../latestBlogSlice";
import { blogByCategorySlice } from "../blogByCategorySlice";
import { blogSearchSlice } from "../blogSearchSlice";

const Store = configureStore({
    reducer: {
        Auth: authSlice.reducer,
        Blog: blogSlice.reducer,
        Article: articleSlice.reducer,
        Category: categorySlice.reducer,
        LatestArticles: latestBlogSlice.reducer,
        BlogByCategory: blogByCategorySlice.reducer,
        SearchBlog: blogSearchSlice.reducer
    }
})

export default Store