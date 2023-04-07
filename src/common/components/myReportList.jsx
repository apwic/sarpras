import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import reportStatusConstant from '../constants/reportStatusConstant';
import reportTypeConstant from '../constants/reportTypeConstant';
import ReportStatusLabel from './labels/reportStatusLabel';
import ReportTypeLabel from './labels/reportTypeLabel';
import EmptyScreen from './emptyScreen';
import { getCreatedDateDiff } from '../tools';
import { connect } from 'react-redux';

class MyReportList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myReports: [],
        };
    }

    componentDidMount() {
        this.setState({
            myReports: this.props.myReports,
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.myReports !== this.props.myReports) {
            this.setState({
                myReports: this.props.myReports,
            });
        }
    }

    render() {
        if (this.state.myReports.length === 0) {
            return <EmptyScreen />;
        }
        return this.state.myReports.rows.map((myReport) => {
            return (
                <div
                    className="my-report-item"
                    onClick={() =>
                        this.props.handleMyReportClicked(myReport.id)
                    }
                    key={myReport.id}
                >
                    <div className="my-report-item__body">
                        <div className="item-labels">
                            <ReportTypeLabel
                                type={reportTypeConstant[myReport.category]}
                            />
                            <ReportStatusLabel
                                status={reportStatusConstant[myReport.status]}
                            />
                        </div>
                        <div className="item-details">
                            <h3 className="item-name">{myReport.title}</h3>
                            <h4 className="item-location">
                                {myReport.location}
                            </h4>
                            <p>{myReport.description}</p>
                        </div>
                        <div className="item-footer">
                            <div className="report-date">
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="icon-report-date"
                                />
                                <label className="label-report-date">
                                    {getCreatedDateDiff(myReport.createdAt)}{' '}
                                    oleh{' '}
                                    {myReport.creator.id === this.props.user.id
                                        ? 'Saya'
                                        : myReport.creator.name}
                                </label>
                            </div>
                            {myReport.user_assigned_name && (
                                <div className="report-assignment">
                                    <FontAwesomeIcon
                                        icon={faUserEdit}
                                        className="icon-report-assignment"
                                    />
                                    <label className="label-report-assignment">
                                        Ditugaskan kepada{' '}
                                        {myReport.user_assigned_name}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="my-report-item__image">
                        <img
                            src={
                                myReport.image
                                    ? myReport.image[0]
                                    : 'https://www.w3schools.com/howto/img_avatar.png'
                            }
                            alt="report image"
                        />
                    </div>
                </div>
            );
        });
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReportList);
