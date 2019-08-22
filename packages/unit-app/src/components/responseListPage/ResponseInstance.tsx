import * as React from 'react';
import { ResponseInstanceProps } from '../../interface/components/ResponseInstanceProps';
import { Link } from 'react-router-dom';

export const ResponseInstance = (props: ResponseInstanceProps) => {
    const { response } = props;

    return <li className="list-group-item">
        <div className="row">
            <div className="col-4 d-flex align-items-center">
                <span>{new Date(response.authored).toLocaleString()}</span>
            </div>
            <div className="col">
                <div className="d-flex justify-content-end">
                    <Link to={`/questionnaire/105985/response/${response.id}`} className="btn btn-outline-success">
                        <i className="fas fa-play"></i>
                    </Link>
                </div>
            </div>
        </div>
    </li>
}