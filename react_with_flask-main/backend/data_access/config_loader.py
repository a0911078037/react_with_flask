from dotenv import load_dotenv
import yaml


class ConfigLoader:
    def __init__(self, config_path):
        load_dotenv()
        with open(config_path, 'r') as data:
            self.config = yaml.safe_load(data)

    def get_config(self):
        return self.config
