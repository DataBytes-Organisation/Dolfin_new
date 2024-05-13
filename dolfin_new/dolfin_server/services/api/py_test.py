from dotenv import load_dotenv
from services.api.basiq_api import Core as API_Core
from services.api.basiq_api import Data as API_Data
import os
from services.api.basiq_converter import BasiqConverter as API_Converter
import json
from services.ai.d_cloud.expenditure_cluster_model import cluster
from services.ai.d_cloud.word_cloud import generate

load_dotenv()
api_core_instance = API_Core(os.environ.get("API_KEY"))
api_data_instance = API_Data()
access_token = api_core_instance.generate_auth_token()


def test_unit_01():
    print(api_data_instance.all_accounts('cc1e1867-6d0e-4af4-aebd-95580de95f47', access_token))


def test_unit_02():
    print(api_core_instance.create_auth_link('cc1e1867-6d0e-4af4-aebd-95580de95f47', access_token))


def test_unit_03():
    print(api_data_instance.get_transactions('cc1e1867-6d0e-4af4-aebd-95580de95f47', access_token))


def test_unit_04():
    tran_data = json.loads(api_data_instance.get_transactions('cc1e1867-6d0e-4af4-aebd-95580de95f47', access_token))
    transaction_df = API_Converter.convert_basiq_transactions_to_dataframe(tran_data)
    result1, result2 = cluster(transaction_df)
    print(result2)
    image = generate(result1, preprocess=False)
    print(image)


test_unit_04()
