"""Hello unit test module."""

from sensor.hello import hello


def test_hello() -> None:
    """Test the hello function."""
    assert hello() == "Hello sensor"
