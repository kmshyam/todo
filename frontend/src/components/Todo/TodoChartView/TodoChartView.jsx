import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ReactDOM from "react-dom";
import classes from "./TodoChartView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { getTokenDetails } from "../../Utils/CheckAuth";
import noDataImg from "../../assets/NoData.jpg";

const ModalOverlay = ({ title, pendingTodos, completedTodos, onClose }) => {
  const tokenDetails = getTokenDetails();

  const myPendingTodos = pendingTodos.filter(
    (todo) => todo.userID === tokenDetails.userID
  );

  const myCompletedTodos = completedTodos.filter(
    (todo) => todo.userID === tokenDetails.userID
  );

  const pendingTodosCount = myPendingTodos.length;
  const completedTodosCount = myCompletedTodos.length;

  const todosArray = [pendingTodosCount, completedTodosCount];

  const options = {
    chart: {
      width: 400,
    },
    legend: {
      show: true,
      position: "bottom",
      align: "center",
    },
    labels: ["Pending Todos", "Completed Todos"],
    colors: ["#519de9", "#51cf66"],
    responsive: [
      {
        breakpoint: 200,
        options: {
          chart: {
            width: 100,
          },
        },
      },
    ],
    annotations: {
      text: [
        {
          text: `${pendingTodosCount + completedTodosCount}`,
          x: "50%",
          y: "50%",
          textAnchor: "middle",
          foreColor: "#000",
          fontSize: "20px",
          fontWeight: "bold",
        },
      ],
    },
  };

  return (
    <>
      <div className={classes["pending-completed-chart-container"]}>
        <header className={classes.header}>
          <h2>{title}</h2>
          <FontAwesomeIcon
            className={classes["close-icon"]}
            icon={faClose}
            onClick={onClose}
          />
        </header>
        {pendingTodosCount > 0 || completedTodosCount > 0 ? (
          <>
            <ReactApexChart
              options={options}
              series={todosArray}
              type="donut"
            />
            <div className={classes["count-overlay-box"]}>
              <p>
                Total todos:&nbsp;
                <span className={classes["todos-count"]}>
                  {pendingTodosCount + completedTodosCount}
                </span>
              </p>
              <p>
                Pending todos:&nbsp;
                <span className={classes["todos-count"]}>
                  {pendingTodosCount}
                </span>
              </p>
              <p>
                Completed todos:&nbsp;
                <span className={classes["todos-count"]}>
                  {completedTodosCount}
                </span>
              </p>
            </div>
          </>
        ) : (
          <section className={classes["no-data-container"]}>
            <div className={classes["no-data-img"]}>
              <img src={noDataImg} alt="No data" />
            </div>
            <p className={classes["no-data-chart"]}>
              Oops! There is pending todos and completed todos to show the
              chart.
            </p>
          </section>
        )}
      </div>
    </>
  );
};

const TodoChartView = ({ title, pendingTodos, completedTodos, onClose }) => {
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const escapeHandler = (e) => {
      if (e.keyCode === 27) {
        setModalOpen(false);
        onClose();
      }
    };
    if (modalOpen) {
      document.addEventListener("keydown", escapeHandler);
    }
  }, [modalOpen, onClose]);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop className={classes.backdrop} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          pendingTodos={pendingTodos}
          completedTodos={completedTodos}
          onClose={onClose}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default TodoChartView;
