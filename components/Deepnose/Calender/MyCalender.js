import React, {Component} from "react";
import {Button, Card, Modal, Select} from "antd";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import {getEventsAction} from "../../../actions/clients";
import {getCookies} from "cookies-next";
import {connect} from "react-redux";

const {Option} = Select;

class MyCalender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventModal: false,
            eventContent: {}
        }
    }

    componentDidMount() {
        this.props.fetchEvents(getCookies(null, "authToken"));
    }

    EventModal = () => (
        <Modal
            title={false}
            visible={this.state.eventModal}
            okButtonProps={{
                style: { display: "none" },
            }}
            cancelButtonProps={{
                style: { display: "none" },
            }}
            onCancel={() => this.setState({
                eventModal: false
            })}
            centered
        >
            <div>
                <h4 className="mb-3">Event Title: {this.state.eventContent.titleText}</h4>
                {/*<h6>{this.state.eventContent.title}</h6>*/}
                <h5 className="mb-2">Event Description: {this.state.eventContent.description}</h5>
                <h5 className="mb-2">Event Start at: {this.state.eventContent.start}</h5>
                <h5 className="mb-2">Event End at: {this.state.eventContent.end}</h5>

            </div>
        </Modal>
    )


    render() {
        const localizer = momentLocalizer(moment);

        return (
            <Card className="calender-container">
                {this.EventModal()}

                <div className="calender-title-bar">
                    <div className="calender-title">
                        <h3>Your Calender</h3>
                    </div>
                    <div className="calender-filter">
                        <div className="calender-filter-item">
                            <h6>Year :</h6>

                            <Select
                                showSearch
                                placeholder="Select a year"
                                optionFilterProp="children"
                                className="filter-select"
                                filterOption={(input, option) =>
                                    option.value.indexOf(input) >= 0
                                }
                            >
                                <Option value="2020">2020</Option>
                                <Option value="2021">2021</Option>
                                <Option value="2022">2022</Option>
                            </Select>
                        </div>

                        <div className="calender-filter-item">
                            <h6>Month :</h6>

                            <Select
                                showSearch
                                placeholder="Select month"
                                optionFilterProp="children"
                                className="filter-select"
                                filterOption={(input, option) =>
                                    option.value.indexOf(input) >= 0
                                }
                            >
                                <Option value="1">January</Option>
                                <Option value="2">February</Option>
                                <Option value="3">March</Option>
                            </Select>
                        </div>

                        <div className="calender-filter-item">
                            <h6>View :</h6>

                            <Button
                                type="outline"
                                shape="round"
                                style={{marginRight: "5px"}}
                                className="view-btn activeViewBtn"
                            >
                                Month
                            </Button>

                            <Button
                                type="outline"
                                shape="round"
                                className="view-btn"
                            >
                                Year
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 my-calendar">
                    <Calendar
                        localizer={localizer}
                        events={this.props.events}
                        startAccessor="start"
                        endAccessor="end"
                        toolbar={false}
                        style={{height: "500px"}}
                        onSelectEvent={(event) => {
                            this.setState({
                                eventModal: true,
                                eventContent: event
                            })
                            console.log(this.state)
                        }}
                        onSelectSlot={() => console.log("Select Slot")}
                    />

                    {/* <Calendar className="bg-transparent" /> */}
                </div>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        events: state.clients.events,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEvents: (token) => dispatch(getEventsAction(token)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCalender);
