import React from 'react'
import {
    EpubView, // Underlaying epub-canvas (wrapper for epub.js iframe)
    EpubViewStyle, // Styles for EpubView, you can pass it to the instance as a style prop for customize it
    ReactReader, // A simple epub-reader with left/right button and chapter navigation
    ReactReaderStyle // Styles for the epub-reader it you need to customize it
  } from "react-reader";
  
  
import Ebook from './alize.epub';

export default function Reader() {
    return (
        <div>
            <div style={{ position: "relative", height: "100vh" }}>
                <ReactReader
                url={Ebook}
                location={"epubcfi(/6/2[cover]!/6)"}
                locationChanged={epubcifi => console.log(epubcifi)}
                tocChanged={toc => console.log(toc)}
                />
                <a href="/member/books/all"><button>Kembali</button></a>
            </div>
        </div>
    )
}
