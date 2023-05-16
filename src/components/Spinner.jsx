import { Spinner } from 'reactstrap';

export default function Loader() {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '500px' }}
        >
            <Spinner color="warning" className="text-center" />
        </div>
    );
}
