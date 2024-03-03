import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DayCard from "../components/DayCard";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Loader from "../components/Loader";
import  {motion} from 'framer-motion';
import { slideAnimation } from "./configs/motion";
function App() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState();
  const [calories, setCalories] = useState();
  const [cusion, setCusion] = useState("");
  const [Allergen, setAllergen] = useState("");
  const [Diet, setDiet] = useState("non-vegan");
  const [num, setNum] = useState(1);
  const [plan, setPlan] = useState({});

  const convertToJson = (response) => {
    const responseString = JSON.parse(response);
    // const responseString = response;
    console.log(responseString);
    setPlan({
      MONDAY: responseString.MONDAY,
      TUESDAY: responseString.TUESDAY,
      WEDNESDAY: responseString.WEDNESDAY,
      THURSDAY: responseString.THURSDAY,
      FRIDAY: responseString.FRIDAY,
    });
  };
  useEffect(() => {
    if (response !== "") {
      convertToJson(response.response.message.content);
      // convertToJson(response);
    }
  }, [response]);

  useEffect(() => {
    console.log(plan);
  }, [plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dietPlan = { age, calories, cusion, Allergen, Diet };
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/plan", {
        dietPlan: dietPlan,
      });
      await setResponse(res.data);
    } catch (err) {
      console.log(err);
      alert("Error communicating with the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cards = (num) => {
    switch (num) {
      case 1:
        return <DayCard day={plan.MONDAY} d={"Monday"} />;
      case 2:
        return <DayCard day={plan.TUESDAY} d={"Tuesday"} />;
      case 3:
        return <DayCard day={plan.WEDNESDAY} d={"Wednesday"} />;
      case 4:
        return <DayCard day={plan.THURSDAY} d={"Thrusday"} />;
      case 5:
        return <DayCard day={plan.FRIDAY} d={"Friday"} />;
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setResponse({
  //     MONDAY: [
  //       { MEAL: "BREAKFAST", DISH: "Masala Dosa with Chutney", CALORIES: 350 },
  //       { MEAL: "LUNCH", DISH: "Chana Masala with Roti", CALORIES: 400 },
  //       { MEAL: "DINNER", DISH: "Vegetable Biryani", CALORIES: 450 },
  //     ],
  //     TUESDAY: [
  //       { MEAL: "BREAKFAST", DISH: "Poha (Flattened Rice)", CALORIES: 300 },
  //       { MEAL: "LUNCH", DISH: "Palak Paneer with Rice", CALORIES: 400 },
  //       { MEAL: "DINNER", DISH: "Vegetable Kathi Roll", CALORIES: 450 },
  //     ],
  //     WEDNESDAY: [
  //       { MEAL: "BREAKFAST", DISH: "Upma (Semolina)", CALORIES: 300 },
  //       { MEAL: "LUNCH", DISH: "Baingan Bharta with Roti", CALORIES: 400 },
  //       { MEAL: "DINNER", DISH: "Vegetable Pulao", CALORIES: 450 },
  //     ],
  //     THURSDAY: [
  //       { MEAL: "BREAKFAST", DISH: "Idli with Sambar", CALORIES: 350 },
  //       { MEAL: "LUNCH", DISH: "Dal Makhani with Jeera Rice", CALORIES: 400 },
  //       { MEAL: "DINNER", DISH: "Chole Bhature", CALORIES: 450 },
  //     ],
  //     FRIDAY: [
  //       { MEAL: "BREAKFAST", DISH: "Rava Upma", CALORIES: 300 },
  //       { MEAL: "LUNCH", DISH: "Aloo Gobi with Roti", CALORIES: 400 },
  //       { MEAL: "DINNER", DISH: "Vegetable Handi", CALORIES: 450 },
  //     ],
  //   });
  // };
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <div className="flex flex-col items-center justify-center h-screen dark">
          <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 relative">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              Diet Planner
            </h2>

            {Object.keys(plan).length === 0 ? (
              <div>
                {loading == true ? (
               <div className="flex items-center justify-center h-[300px]">
               <Loader />
             </div>



                ) : (
                  <form className="flex flex-col">
                    <input
                      placeholder="Age"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      step="0.1"
                    />
                    <input
                      placeholder="Maintenance calories"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={calories}
                      onChange={(e) => setCalories(e.target.value)}
                    />
                    <input
                      placeholder="cuisines you like"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={cusion}
                      onChange={(e) => setCusion(e.target.value)}
                    />
                    <input
                      placeholder="Other Allergens"
                      className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                      type="text"
                      value={Allergen}
                      onChange={(e) => setAllergen(e.target.value)}
                    />
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      <span className="text-gray-400">
                        Diet you want to follow?
                      </span>
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={Diet}
                      onChange={(e) => setDiet(e.target.value)}
                    >
                      <FormControlLabel
                        className="text-gray-400"
                        value="veg"
                        control={<Radio />}
                        label="Vegan"
                      />
                      <FormControlLabel
                        className="text-gray-400"
                        value="nonvegan"
                        control={<Radio />}
                        label="Non-Vegan"
                      />
                    </RadioGroup>
                    <button
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Make my plan!
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="text-gray-400 ">
              <motion.div  {...slideAnimation("left")}>
              {cards(num)}
              </motion.div>
               
                <button
                  className="absolute right-5 top-1/2"
                  onClick={() => {
                    num < 6 ? setNum(num + 1) : setNum(num);
                  }}
                >
                  <MdArrowForwardIos size="35px" />
                </button>

                <button
                  className="absolute left-5 top-1/2"
                  onClick={() => {
                    num > 0 ? setNum(num - 1) : setNum(num);
                  }}
                >
                  <MdOutlineArrowBackIosNew size="35px" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
