import { createContext, useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import CouponModal from "./components/CouponModal";

export const ModalContext = createContext();

function App() {
  const [openModal, setOpenModal] = useState(false);
  

  const [globalState, setGlobalState] = useState({
    setOpenModal,
    globalEmail: "",
    couponError: "",
    couponSuccess: '',
  });

  return (
    <ModalContext.Provider value={{ globalState, setGlobalState }}>
      <div>
        {openModal && <CouponModal />}

        <div className="app my-[20px] sm:my-[100px] max-w-[100%] sm:max-w-[60%] relative left-1 md:left-0 w-[100%] sm:m-auto bg-white rounded-[15px] sm:pt-20 sm:px-12 pb-5">
          <Header />
          <Body />
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export default App;
