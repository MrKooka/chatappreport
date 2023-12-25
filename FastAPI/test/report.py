import typing
from unicodedata import decimal

from typing import TypedDict, List

class ReportTemplate(TypedDict):
    date: int
    Shift: str
    Route_ID: str
    Test_Car_ID: str
    Current_Location: str
    Working_hours: str
    events:List[str]
    ZAM_sets: List[str]
    Recording_time: str
    o_Pre_drive_tests: int
    o_Pre_Drive_Test_duration: int
    o_PowerCycles: int
    o_PowerCycles_duration: int
    ERRORS: List[str]
    Organizational_downtime: str
    System_downtime: str
    Standby_downtime: str
    Break: str
    delimiter: str



report_template = {
    "date": int,
    "Shift:": str,
    "Route ID:": str,
    "Test Car ID:": str,
    "Current Location:": str,
    "Working hours:": str,
    "Events":typing.List,
    "ZAM sets: ": typing.List,
    "Recording time:": str,
    "o Pre drive tests -": int,
    "o Pre Drive Test duration -": int,
    "o PowerCycles - ": int,
    "o PowerCycles duration -": int,
    "ERRORS:":typing.List,
    "Recording time: ": str,
    "Organizational downtime: ": str,
    "System downtime: ": str,
    "Standby downtime: ": str,
    "Break: ": str,
    "delimiter": "__________________________"
}