export default function Input(props) {
    const { name } = props;
    return (
        <input max="100" name={name} className="form-control" type="number" {...props}/>
    )
}
