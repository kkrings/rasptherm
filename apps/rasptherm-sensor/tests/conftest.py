import pytest


def pytest_addoption(parser: pytest.Parser) -> None:
    parser.addoption("--port", type=int, default=0, help="Port for serving sensor")


@pytest.fixture
def port(pytestconfig: pytest.Config) -> int:
    return int(pytestconfig.getoption("port"))
