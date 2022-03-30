import classes from "./ResultItem.module.css";

const ResultItem = props => {
  const price = `Marks: ${props.price}`;
  const status = `Gread: ${props.status}`;
  const name = `Subject: ${props.name}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.status}>{status}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div></div>
    </li>
  );
};

export default ResultItem;
