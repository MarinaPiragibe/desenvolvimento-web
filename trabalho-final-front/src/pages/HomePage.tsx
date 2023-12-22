import React from "react";
import { Carousel } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <><Carousel style={{ marginTop: "69px" }} className='d-none d-md-block mb-4'>
      <Carousel.Item>
        <img className="d-block mx-auto" width={1200} height={350} src="https://www.centrodeartes.uff.br/wp-content/uploads/2023/12/Banner-Cinema-2.png" />
      </Carousel.Item>
      <Carousel.Item>
      <img className="d-block mx-auto" width={1200} height={350} src="https://www.centrodeartes.uff.br/wp-content/uploads/2023/12/Banner-Cinema-2.png" />
        <Carousel.Caption>
          <h3>Filmes Diversos</h3>
          <p>Desconto para Docentes e Discentes</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div>
      <Outlet></Outlet>
    </div>
    </>
  )
}

export default HomePage